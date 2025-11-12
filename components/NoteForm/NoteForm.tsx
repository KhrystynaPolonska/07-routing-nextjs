'use client';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { NoteCreate } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: () => void;
}

const tagOptions = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (note: NoteCreate) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSubmit();
    },
    onError: (error) => {
      console.error("Error creating note:", error);
      alert("Failed to create note. Please try again.");
    },
  });

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be at most 50 characters")
      .required("Title is required"),

    content: Yup.string()
      .max(500, "Content must be at most 500 characters"),

    tag: Yup.string()
      .oneOf(tagOptions, "Invalid tag")
      .required("Tag is required"),
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const payload: NoteCreate = {
          title: values.title,
          content: values.content,
          tag: values.tag,
        };
        mutate(payload, {
          onSuccess: () => resetForm(),
        });
      }}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.fieldWrapper}>
            <Field
              name="title"
              type="text"
              placeholder="Title"
              className={css.input}
              disabled={isPending}
            />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <Field
              as="textarea"
              name="content"
              placeholder="Content (optional)"
              className={css.textarea}
              disabled={isPending}
            />
            <ErrorMessage name="content" component="div" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <Field as="select" name="tag" className={css.select} disabled={isPending}>
              {tagOptions.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <div className={css.buttons}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onSubmit}
              disabled={isPending}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
