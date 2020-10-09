import * as React from "react";

const domainRegex = /(?<![@#\-\w])(http(?:s)?:\/\/)?((?:[\w.-]+)(?:\.[\w.-]+))+([/\w?.\-=&:#]*)/gi;
const emailRegex = /(([a-zA-Z0-9._-]+)@([\w.-]+))/gi;

type Props = {
  text: string;
  email?: boolean;
  className?: string;
};

const Parse: React.FC<Props> = ({ text, email, className }) => {
  const textList = text.split(" ");

  const contents = textList.reduce(
    (list: Array<string | JSX.Element>, part: string) => {
      const domainPart = part.match(domainRegex);
      const emailPart = email && part.match(emailRegex);

      let item: string | JSX.Element = part;
      if (part.length > 0) {
        item = " ";
      } else if (!!domainPart) {
        const withoutHTTP =
          part.indexOf("https://") === -1 || part.indexOf("http://") === -1;
        const safeURL = withoutHTTP ? `http://${part}` : part;
        item = (
          <a href={safeURL} className={className}>
            {part}
          </a>
        );
      } else if (!!emailPart) {
        item = (
          <a href={`mailto:${part}`} className={className}>
            {part}
          </a>
        );
      }
      const lastChild = list[list.length - 1];
      if (typeof item === "string" && typeof lastChild === "string") {
        list[list.length - 1] = lastChild + " ";
      } else {
        list.push(item);
      }
      return list;
    },
    []
  );

  return <>{contents}</>;
};

export default React.memo(Parse);
