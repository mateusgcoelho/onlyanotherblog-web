import React, { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface EditorMarkdownComponentProps {
  textAreaProps: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  errorTextArea?: string;
  source: string;
  feedElement: (syntax: string) => void;
}

export const EditorMarkdownComponent = ({
  textAreaProps,
  errorTextArea,
  source,
  feedElement,
}: EditorMarkdownComponentProps) => {
  const options = { code: CodeBlock, pre: Pre };

  const [showMarkdownViewer, setShowMarkdownViewer] = useState(false);

  return (
    <div className="flex-1 w-full flex h-96">
      <section className="flex flex-col flex-1 h-96">
        <Header
          feedElement={feedElement}
          toggleShowHeader={() => setShowMarkdownViewer(!showMarkdownViewer)}
          isVisible={!showMarkdownViewer}
        />
        <textarea
          className="border placeholder:text-slate-700 border-slate-700 bg-transparent rounded-md text-sm p-2 focus:border-purple-600 outline-none focus:shadow-2xl focus:shadow-blue-500/20 transition-all w-full flex-1 overflow-y-auto resize-none"
          placeholder="No que esta pensando? 🍕"
          autoFocus
          {...textAreaProps}
          value={source}
        />
        <p className="text-red-500 text-xs mt-1">{errorTextArea ?? ""}</p>
      </section>

      <div className="fixed border-r-2 border-r-dashed" />

      {showMarkdownViewer && (
        <article className="flex-1 w-full p-6 flex-wrap flex h-full overflow-y-auto">
          <Markdown
            className="prose prose-invert flex-wrap text-wrap w-full flex-1 break-words h-full"
            components={options}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSanitize,
              [rehypeExternalLinks, { content: { type: "text", value: "🔗" } }],
            ]}
          >
            {source}
          </Markdown>
        </article>
      )}
    </div>
  );
};

const Header = ({
  feedElement,
  toggleShowHeader,
  isVisible,
}: {
  feedElement: (syntax: string) => void;
  toggleShowHeader: () => void;
  isVisible: boolean;
}) => {
  const btns = [
    { name: "B", syntax: "**Bold**" },
    { name: "I", syntax: "*Italic*" },
    { name: "S", syntax: "~Strikethrough~" },
    { name: "H1", syntax: "# " },
    { name: "H2", syntax: "## " },
  ];

  return (
    <header className="flex items-center justify-between mb-2">
      <div className="w-full flex items-center gap-x-2">
        {btns.map((btn) => (
          <button
            key={btn.syntax}
            type="button"
            className="flex bg-slate-900 w-8 h-8 items-center justify-center rounded-md hover:bg-slate-700 transition-all"
            onClick={() => feedElement(btn.syntax)}
          >
            {btn.name}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="flex bg-slate-900 p-2 min-w-[140px] gap-x-2 text-xs h-8 items-center justify-center rounded-md hover:bg-slate-700 transition-all"
        onClick={() => toggleShowHeader()}
      >
        {isVisible ? (
          <GoSidebarExpand className="h-4 w-4" />
        ) : (
          <GoSidebarCollapse className="h-4 w-4" />
        )}
        <p>{isVisible ? "Visualizar" : "Editar apenas"}</p>
      </button>
    </header>
  );
};

const CodeBlock = ({ ...props }) => {
  return (
    <SyntaxHighlighter
      language={props.className?.replace(/(?:lang(?:uage)?-)/, "")}
      style={nightOwl}
      wrapLines={true}
      className="props rounded-md"
    >
      {props.children}
    </SyntaxHighlighter>
  );
};

const Pre = ({ ...props }) => {
  return <div className="not-prose">{props.children}</div>;
};
