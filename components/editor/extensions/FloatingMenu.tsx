import React, { RefObject, useEffect, useRef } from "react";
import {
  FloatingMenuPlugin,
  FloatingMenuPluginProps,
} from "./floating-menu-plugin";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type FloatingMenuProps = Omit<
  Optional<FloatingMenuPluginProps, "pluginKey">,
  "element"
> & {
  className?: string;
  editorBox: RefObject<HTMLDivElement>;
};

export const FloatingMenu: React.FC<FloatingMenuProps> = (props) => {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!element.current) {
      return;
    }

    const {
      pluginKey = "floatingMenu",
      editor,
      tippyOptions = {},
      shouldShow = null,
    } = props;

    editor.registerPlugin(
      FloatingMenuPlugin({
        pluginKey,
        editor,
        editorBox: props.editorBox,
        element: element.current as HTMLElement,
        tippyOptions,
        shouldShow,
      })
    );

    return () => {
      editor.unregisterPlugin(pluginKey);
    };
  }, [props.editor, element.current]);

  return (
    <div
      ref={element}
      className={props.className}
      style={{ visibility: "hidden" }}
    >
      {props.children}
    </div>
  );
};
