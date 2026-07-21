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

const formSchema = z.object({
  image: z
    //Rest of validations done via react dropzone
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image"),
});

export const ImageUploader: React.FC<{
  imageToText: string;
  setImageToText: (imageToText: string) => void;
}> = ({ setImageToText }) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");
  const [loading, setLoading] = React.useState<boolean>(false);

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
      } catch {
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
    await worker.terminate();
    setLoading(false);
  };

  const selectedFile = form.getValues("image");
  const fileName = preview && selectedFile?.size ? selectedFile.name : null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="flex flex-1 flex-col gap-3 space-y-0 p-4">
              <FormLabel
                className={`sr-only ${
                  fileRejections.length !== 0 && "text-destructive"
                }`}
              >
                Upload your image
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/40 hover:border-primary/50 hover:bg-muted/60"
                  }`}
                >
                  {preview ? (
                    <img
                      src={preview as string}
                      alt="Preview of the image you uploaded"
                      className="mx-auto max-h-64 w-auto rounded-lg object-contain"
                    />
                  ) : (
                    <ImagePlus
                      className="size-10 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                  <Input {...getInputProps()} type="file" />
                  {isDragActive ? (
                    <p className="text-sm text-muted-foreground">
                      Drop the image!
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Click here or drag an image to upload it
                    </p>
                  )}
                  {fileName && (
                    <p className="max-w-full truncate font-mono text-xs text-muted-foreground">
                      {fileName}
                    </p>
                  )}
                </div>
              </FormControl>
              <FormMessage className="shrink-0">
                {fileRejections.length !== 0 && (
                  <span>
                    Image must be less than 1MB and of type png, jpg, or jpeg
                  </span>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <footer className="shrink-0 border-t border-border p-3">
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </footer>
      </form>
    </Form>
  );
};
