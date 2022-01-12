import { Editor, posToDOMRect } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { RefObject } from "react";
import tippy, { Instance, Props } from "tippy.js";

export interface FloatingMenuPluginProps {
  pluginKey: PluginKey | string;
  editor: Editor;
  element: HTMLElement;
  tippyOptions?: Partial<Props>;
  editorBox: RefObject<HTMLDivElement>;
  shouldShow?:
    | ((props: {
        editor: Editor;
        view: EditorView;
        state: EditorState;
        oldState?: EditorState;
      }) => boolean)
    | null;
}

export type FloatingMenuViewProps = FloatingMenuPluginProps & {
  view: EditorView;
};

export class FloatingMenuView {
  public editor: Editor;

  public editorBox: RefObject<HTMLDivElement>;

  public element: HTMLElement;

  public view: EditorView;

  public preventHide = false;

  public tippy: Instance | undefined;

  public tippyOptions?: Partial<Props>;

  public shouldShow: Exclude<FloatingMenuPluginProps["shouldShow"], null> = ({
    state,
  }) => {
    const { selection } = state;
    const { $anchor, empty } = selection;
    const isRootDepth = $anchor.depth === 1;
    const isEmptyTextBlock =
      $anchor.parent.isTextblock &&
      !$anchor.parent.type.spec.code &&
      !$anchor.parent.textContent;

    if (!empty || !isRootDepth || !isEmptyTextBlock) {
      return false;
    }

    return true;
  };

  constructor({
    editor,
    element,
    editorBox,
    view,
    tippyOptions = {},
    shouldShow,
  }: FloatingMenuViewProps) {
    this.editor = editor;
    this.element = element;
    this.view = view;
    this.editorBox = editorBox;

    if (shouldShow) {
      this.shouldShow = shouldShow;
    }

    this.element.addEventListener("mousedown", this.mousedownHandler, {
      capture: true,
    });
    this.editor.on("focus", this.focusHandler);
    this.editor.on("blur", this.blurHandler);
    this.tippyOptions = tippyOptions;
    // Detaches menu content from its current parent
    this.element.remove();
    this.element.style.visibility = "visible";
  }

  mousedownHandler = () => {
    this.preventHide = true;
  };

  focusHandler = () => {
    // we use `setTimeout` to make sure `selection` is already updated
    setTimeout(() => this.update(this.editor.view));
  };

  blurHandler = ({ event }: { event: FocusEvent }) => {
    if (this.preventHide) {
      this.preventHide = false;

      return;
    }

    if (
      event?.relatedTarget &&
      this.element.parentNode?.contains(event.relatedTarget as Node)
    ) {
      return;
    }

    this.hide();
  };

  createTooltip() {
    const { element: editorElement } = this.editor.options;
    const editorIsAttached = !!editorElement.parentElement;

    if (this.tippy || !editorIsAttached) {
      return;
    }

    this.tippy = tippy(editorElement, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle",
      ...this.tippyOptions,
    });
  }

  update(view: EditorView, oldState?: EditorState) {
    const { state } = view;
    const { doc, selection } = state;
    const { from, to } = selection;
    const isSame =
      oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection);

    const { $anchor, empty } = selection;
    const isEmptyTextBlock =
      $anchor.parent.isTextblock &&
      !$anchor.parent.type.spec.code &&
      !$anchor.parent.textContent;

    if (isSame) {
      return;
    }

    this.createTooltip();

    const shouldShow = this.shouldShow?.({
      editor: this.editor,
      view,
      state,
      oldState,
    });

    if (!shouldShow) {
      this.hide();

      return;
    }

    // console.log(isEmptyTextBlock);

    // console.log(posToDOMRect(view, from, to));

    // const editorBox: any = document.getElementsByClassName("editor-box")[0];
    const editorBox = this.editorBox.current;
    const leftOffset = editorBox
      ? editorBox.scrollWidth + editorBox.offsetLeft
      : 0;

    // console.log(empty);

    this.element.className = isEmptyTextBlock
      ? "floating-menu"
      : "floating-menu outer-floating-menu";

    // console.log("from", from, "to", to);

    this.tippy?.setProps({
      getReferenceClientRect: () => {
        const cursorPosition = posToDOMRect(view, from, from); //from, to
        const sidePosition = {
          ...cursorPosition,
          left: leftOffset,
          width: 0,
        };
        console.log("sidePosition", sidePosition);
        if (isEmptyTextBlock && empty) return cursorPosition;
        else return sidePosition;
      },
    });

    this.show();
  }

  show() {
    this.tippy?.show();
  }

  hide() {
    this.tippy?.hide();
  }

  destroy() {
    this.tippy?.destroy();
    this.element.removeEventListener("mousedown", this.mousedownHandler, {
      capture: true,
    });
    this.editor.off("focus", this.focusHandler);
    this.editor.off("blur", this.blurHandler);
  }
}

export const FloatingMenuPlugin = (options: FloatingMenuPluginProps) => {
  return new Plugin({
    key:
      typeof options.pluginKey === "string"
        ? new PluginKey(options.pluginKey)
        : options.pluginKey,
    view: (view) => new FloatingMenuView({ view, ...options }),
  });
};
