

interface BlogContentProps {
  
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <article className="max-w-none">
       
      
      <div
        className="text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};
