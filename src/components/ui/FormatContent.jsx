import React from 'react';

const FormattedContent = ({ content }) => {
  const hashtagRegex = /#(\w+)/g;

  const formattedContent = content.split("\n").map((line, index) => {
    const formattedLine = line.replace(hashtagRegex, (match, hashtag) => {
      return `<a href="/hashtag/${hashtag}" class="text-primary hover:underline">#${hashtag}</a>`;
    });

    return (
      <span
        className="block"
        key={index}
        dangerouslySetInnerHTML={{ __html: formattedLine }}
      />
    );
  });

  return <>{formattedContent}</>;
};

export default FormattedContent;
