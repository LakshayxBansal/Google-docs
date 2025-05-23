"use client";

import { 
    BoldIcon,
    ItalicIcon, 
    ListTodoIcon, 
    LucideIcon, 
    MessageSquarePlusIcon, 
    PrinterIcon, 
    Redo2Icon, 
    RemoveFormattingIcon, 
    SpellCheck, 
    UnderlineIcon, 
    Undo2Icon 
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";

import { Separator } from "@/components/ui/separator";

import HeadingLevelButton from "../Toolbar/headingLevelButton/page";
import FontFamilyButton from "../Toolbar/fontFamilyButton/page";
import TextColorButton from "../Toolbar/textColor/page";
import HighlightColorButton from "../Toolbar/HighlightButton/page";
import LinkButton from "../Toolbar/LinkButton/page";
import ImageButton from "../Toolbar/imageButton/page";
import AlignButton from "../Toolbar/AlignButton/page";
import ListButton from "../Toolbar/ListButton/page";
import FontSizeButton from "../Toolbar/FontSizeButton/page";
import LineHeightButton from "../Toolbar/LineHeightButton/page";

    

interface ToolBarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

const ToolBarButton = ({ onClick, isActive, icon: Icon }: ToolBarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className="size-4" />
        </button>
    );
};


export default function ToolBar (){
    const { editor } = useEditorStore();

    const sections: {
        label: string;
        icon: LucideIcon;
        onClick?: () => void;
        isActive?: boolean;
    }[][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
                isActive: true,
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: "Spell Check",
                icon: SpellCheck,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute(
                        "spellcheck",
                        current === "true" ? "false" : "true"
                    );
                },
            },
        ],
        [
            {
                label: "Bold",
                icon: BoldIcon,
                onClick: () => editor?.chain().focus().toggleBold().run(),
                isActive: editor?.isActive("bold"),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                onClick: () => editor?.chain().focus().toggleItalic().run(),
                isActive: editor?.isActive("italic"),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
                isActive: editor?.isActive("underline"),
            },
        ],
        [
            {
                label: "Comments",
                icon: MessageSquarePlusIcon,
                onClick: () => editor?.chain().focus().addPendingComment().run(),
                isActive: editor?.isActive("liveblocksCommentMark"),
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () =>
                    editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive("taskList"),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () =>
                    editor?.chain().focus().unsetAllMarks().run(),
                isActive: editor?.isActive("removeFormatting"),
            },
        ],
    ];

    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((items) => (
                <ToolBarButton key={items.label} {...items} />
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            <FontFamilyButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            <HeadingLevelButton/>
            <FontSizeButton/>
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {sections[1].map((items) => (
                <ToolBarButton key={items.label} {...items} />
            ))}
            <TextColorButton/>
            <HighlightColorButton/>
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <LinkButton/>
            <ImageButton/>
            <AlignButton/>
            <LineHeightButton/>


            <ListButton/>


            {sections[2].map((items) => (
                <ToolBarButton key={items.label} {...items} />
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            
        </div>
    );
};



