import { notFound } from "next/navigation";
import { listeningLessons } from "../listening-data";
import ListeningLessonClient from "../ListeningLessonClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return listeningLessons.map((lesson) => ({ lesson: lesson.slug }));
}

export default async function ListeningLessonPage({ params }: { params: Promise<{ lesson: string }> }) {
  const { lesson: slug } = await params;
  const lesson = listeningLessons.find((item) => item.slug === slug);
  if (!lesson) notFound();
  return <ListeningLessonClient lesson={lesson} root="/english-learning-project" />;
}
