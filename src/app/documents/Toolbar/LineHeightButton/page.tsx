"use client"
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ListCollapseIcon } from "lucide-react";

export default function LineHeightButton(){
    const { editor } = useEditorStore();
    const lineHeights = [
        {label:"Default",value:"normal"},
        {label:"1.00",value:"1"},
        {label:"1.15",value:"1.15"},
        {label:"1.50",value:"1.5"},
        {label:"1.75",value:"1.75"},
        {label:"2.00",value:"2"},
    ]

    return(
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <button
                className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <ListCollapseIcon className="size-4"/>
                </button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lineHeights.map(({ label, value }) => (
                    <button 
                    key={value}
                    onClick={()=> editor?.chain().focus().setLineHeight(value).run()}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.getAttributes("paragrpahs").lineHeights === value && "bg-neutral-200/80"
                    )}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}