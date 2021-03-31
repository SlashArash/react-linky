import * as React from "react";

const domainRegex = /(?<![@#\-\w])(http(?:s)?:\/\/)?((?:[\w.-]+)(?:\.[\w.-]+))+([/\w?.\-=&:#]*)/gi;
const emailRegex = /(([a-zA-Z0-9._-]+)@([\w.-]+))/gi;

type Props = {
  className?: string;
  email?: boolean;
  noopener?: boolean;
  noreferrer?: boolean;
  text: string;
  target: "_self" | "_blank" | "_parent" | "_top";
};

const Parse: React.FC<Props> = ({
  className,
  email,
  noopener,
  noreferrer,
  text,
  target
}) => {
  const rel = `${noopener ? "noopener" : ""}${noreferrer ? " noreferrer" : ""}`;
  const textList = text.split(" ");

  const contents = textList.reduce(
    (list: Array<string | JSX.Element>, part: string) => {
      const domainPart = part.match(domainRegex);
      const emailPart = email && part.match(emailRegex);

      let item: string | JSX.Element = part;
      if (part.length === 0) {
        item = " ";
      } else if (!!domainPart) {
        const withoutHTTP =
          part.indexOf("https://") === -1 && part.indexOf("http://") === -1;
        const safeURL = withoutHTTP ? `http://${part}` : part;
        item = (
          <a href={safeURL} className={className} rel={rel} target={target}>
            {part}
          </a>
        );
      } else if (!!emailPart) {
        item = (
          <a href={`mailto:${part}`} className={className} rel={rel}>
            {part}
          </a>
        );
      }

      const lastChild = list[list.length - 1];
      if (list.length === 0) {
        list.push(item);
      } else if (typeof lastChild === "string") {
        if (typeof item === "string") {
          list[list.length - 1] = lastChild + " " + item;
        } else {
          list[list.length - 1] = lastChild + " ";
          list.push(item);
        }
      } else {
        if (typeof item === "string") {
          list.push(" " + item);
        } else {
          list.push(" ");
          list.push(item);
        }
      }

      return list;
    },
    []
  );

  return <>{contents}</>;
};

export default React.memo(Parse);
