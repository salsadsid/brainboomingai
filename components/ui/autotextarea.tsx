"use client";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useImperativeHandle } from "react";

interface UseAutosizeTextAreaProps {
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  minHeight?: number;
  maxHeight?: number;
  triggerAutoSize: string;
}

export const useAutosizeTextArea = ({
  textAreaRef,
  triggerAutoSize,
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight = 0,
}: UseAutosizeTextAreaProps) => {
  React.useEffect(() => {
    const textAreaElement = textAreaRef.current;
    if (!textAreaElement) return;

    // Batch height calculations in one frame
    window.requestAnimationFrame(() => {
      const offsetBorder = 6;

      // Reset height to get accurate scrollHeight
      textAreaElement.style.height = "auto";
      const scrollHeight = textAreaElement.scrollHeight + offsetBorder;

      // Apply calculated height (clamped within min/max)
      let newHeight = scrollHeight;
      if (scrollHeight > maxHeight) newHeight = maxHeight;
      if (scrollHeight < minHeight + offsetBorder)
        newHeight = minHeight + offsetBorder;

      textAreaElement.style.height = `${newHeight}px`;
    });
  }, [triggerAutoSize]);
};

export type AutosizeTextAreaRef = {
  textArea: HTMLTextAreaElement;
  maxHeight: number;
  minHeight: number;
};

type AutosizeTextAreaProps = {
  maxHeight?: number;
  minHeight?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const AutosizeTextarea = React.forwardRef<
  AutosizeTextAreaRef,
  AutosizeTextAreaProps
>(
  (
    {
      maxHeight = Number.MAX_SAFE_INTEGER,
      minHeight = 100,
      className,
      onChange,
      value,
      ...props
    }: AutosizeTextAreaProps,
    ref: React.Ref<AutosizeTextAreaRef>
  ) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [triggerAutoSize, setTriggerAutoSize] = React.useState("");

    useAutosizeTextArea({
      textAreaRef,
      triggerAutoSize: triggerAutoSize,
      maxHeight,
      minHeight,
    });

    useImperativeHandle(ref, () => ({
      textArea: textAreaRef.current as HTMLTextAreaElement,
      focus: () => textAreaRef?.current?.focus(),
      maxHeight,
      minHeight,
    }));

    React.useEffect(() => {
      setTriggerAutoSize(value as string);
    }, [value]);

    return (
      <textarea
        {...props}
        value={value}
        ref={(element) => {
          textAreaRef.current = element;
          // Apply min/max heights directly to element
          if (element) {
            element.style.minHeight = `${minHeight}px`;
            element.style.maxHeight = `${maxHeight}px`;
          }
        }}
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={(e) => {
          setTriggerAutoSize(e.target.value);
          onChange?.(e);
        }}
      />
    );
  }
);
AutosizeTextarea.displayName = "AutosizeTextarea";
