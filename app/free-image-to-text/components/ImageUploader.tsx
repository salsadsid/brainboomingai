/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { createWorker } from "tesseract.js";
import { z } from "zod";

export const ImageUploader: React.FC<{
  imageToText: string;
  setImageToText: (imageToText: string) => void;
}> = ({ imageToText, setImageToText }) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const formSchema = z.object({
    image: z
      //Rest of validations done via react dropzone
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload an image"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.image) return;
    setLoading(true);
    const worker = await createWorker();
    const ret = await worker.recognize(values.image);
    setImageToText(ret.data.text);
    console.log(ret.data.text);
    await worker.terminate();
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="mx-auto md:w-1/2">
              <FormLabel
                className={`${
                  fileRejections.length !== 0 && "text-destructive"
                }`}
              >
                <h2 className="text-xl font-semibold tracking-tight">
                  Upload your image
                  <span
                    className={
                      form.formState.errors.image || fileRejections.length !== 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  ></span>
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground w-full p-8 shadow-sm shadow-foreground"
                >
                  {preview && (
                    <img
                      src={preview as string}
                      alt="Uploaded image"
                      className="max-h-[400px] rounded-lg"
                    />
                  )}
                  <ImagePlus
                    className={`size-40 ${preview ? "hidden" : "block"}`}
                  />
                  <Input {...getInputProps()} type="file" />
                  {isDragActive ? (
                    <p>Drop the image!</p>
                  ) : (
                    <p>Click here or drag an image to upload it</p>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 1MB and of type png, jpg, or jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mx-auto block h-auto rounded-lg px-8 py-3 text-xl"
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
