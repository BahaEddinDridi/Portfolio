interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-4xl font-bold text-center my-8">
      {title}
    </h2>
  );
}
