import { withProps } from "@udecode/cn";
import { createPlugins, Plate, RenderAfterEditable, PlateElement, PlateLeaf } from "@udecode/plate-common";
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import { createTogglePlugin, ELEMENT_TOGGLE } from "@udecode/plate-toggle";
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { createListPlugin, ELEMENT_UL, ELEMENT_OL, ELEMENT_LI } from "@udecode/plate-list";
import { createMentionPlugin, ELEMENT_MENTION, ELEMENT_MENTION_INPUT } from "@udecode/plate-mention";
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH
} from "@udecode/plate-basic-marks";
import { createKbdPlugin, MARK_KBD } from "@udecode/plate-kbd";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createComboboxPlugin } from "@udecode/plate-combobox";
// import { createEmojiPlugin } from "@udecode/plate-emoji";
import { createExitBreakPlugin, createSoftBreakPlugin } from "@udecode/plate-break";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import { createNormalizeTypesPlugin } from "@udecode/plate-normalizers";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import { createDeletePlugin } from "@udecode/plate-select";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";

import { BlockquoteElement } from "@/components/plate-ui/blockquote-element";
import { LinkElement } from "@/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@/components/plate-ui/link-floating-toolbar";
import { ToggleElement } from "@/components/plate-ui/toggle-element";
import { ListElement } from "@/components/plate-ui/list-element";
import { MentionElement } from "@/components/plate-ui/mention-element";
import { MentionInputElement } from "@/components/plate-ui/mention-input-element";
import { MentionCombobox } from "@/components/plate-ui/mention-combobox";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
// import { EmojiCombobox } from "@/components/plate-ui/emoji-combobox";
import { TooltipProvider } from "@/components/plate-ui/tooltip";

const plugins = createPlugins(
  [
    createBlockquotePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable
    }),
    createTogglePlugin(),
    createParagraphPlugin(),
    createListPlugin(),
    createMentionPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createKbdPlugin(),
    createAutoformatPlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/autoformat
        ],
        enableUndoOnDelete: true
      }
    }),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0
        }
      }
    }),
    createComboboxPlugin(),
    // createEmojiPlugin({
    //   renderAfterEditable: EmojiCombobox
    // }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: "mod+enter"
          },
          {
            hotkey: "mod+shift+enter",
            before: true
          },
          {
            hotkey: "enter",
            query: {
              start: true,
              end: true
              // allow: KEYS_HEADING,
            },
            relative: true,
            level: 1
          }
        ]
      }
    }),
    createNodeIdPlugin(),
    createNormalizeTypesPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ]
      }
    }),
    createDeletePlugin(),
    createSoftBreakPlugin({
      options: {
        rules: [
          { hotkey: "shift+enter" },
          {
            hotkey: "enter",
            query: {
              allow: [
                // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
              ]
            }
          }
        ]
      }
    }),
    createTabbablePlugin(),
    createTrailingBlockPlugin({
      options: { type: ELEMENT_PARAGRAPH }
    }),
    createDeserializeDocxPlugin(),
    createDeserializeMdPlugin()
  ],
  {
    components: withPlaceholders({
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_LINK]: LinkElement,
      [ELEMENT_TOGGLE]: ToggleElement,
      [ELEMENT_UL]: withProps(ListElement, { variant: "ul" }),
      [ELEMENT_OL]: withProps(ListElement, { variant: "ol" }),
      [ELEMENT_LI]: withProps(PlateElement, { as: "li" }),
      [ELEMENT_MENTION]: MentionElement,
      [ELEMENT_MENTION_INPUT]: MentionInputElement,
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
      [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
      [MARK_KBD]: KbdLeaf,
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
      [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" })
    })
  }
);

const initialValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Hello, World!" }]
  }
];

export function PlateEditor() {
  return (
    <TooltipProvider>
      <Plate plugins={plugins} initialValue={initialValue}>
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <Editor />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
        <MentionCombobox items={[]} />
      </Plate>
    </TooltipProvider>
  );
}
