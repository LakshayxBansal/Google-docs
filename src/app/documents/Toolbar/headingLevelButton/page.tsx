import { useEditorStore } from "@/store/use-editor-store";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Level } from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function HeadingLevelButton() {
    const { editor } = useEditorStore();
    const [open, setOpen] = useState(false);

    const headings = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
    ];

    const getCurrentHeadingLevel = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive({ level })) {
                return `Heading ${level}`;
            }
        }
        return "Normal text";
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className="truncate">{getCurrentHeadingLevel()}</span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
                <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                    {headings.map(({ label, value, fontSize }) => (
                        <DropdownMenuItem
                            key={value}
                            onClick={() => {
                                if (value === 0) {
                                    editor?.chain().focus().setParagraph().run();
                                } else {
                                    editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                                }
                                setOpen(false); // Close the dropdown menu
                            }}
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                (value === 0 && !editor?.isActive("heading")) ||
                                    (editor?.isActive("heading", { level: value }) && "bg-neutral-200/80")
                            )}
                            style={{ fontSize }}
                        >
                            <span className="text-sm">{label}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}
