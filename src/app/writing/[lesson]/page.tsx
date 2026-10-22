import { notFound } from "next/navigation";
import { writingLessons } from "../writing-data";
import WritingLessonClient from "../WritingLessonClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return writingLessons.map((lesson) => ({ lesson: lesson.slug }));
}

export default async function WritingLessonPage({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: slug } = await params;
  const lesson = writingLessons.find((item) => item.slug === slug);
  if (!lesson) notFound();
  return <WritingLessonClient lesson={lesson} root="/english-learning-project" />;
}
