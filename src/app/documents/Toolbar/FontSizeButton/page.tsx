import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Minus, MinusIcon, PlusIcon } from "lucide-react";
import { parse } from "path";
import { useState } from "react";



export default function FontSizeButton(){
    const { editor } = useEditorStore();
    const currentFontSize = editor?.getAttributes("textStyle").fontSize?editor?.getAttributes("textStyle").fontSize.replace("px", ""):16;

    const [fontSize, setFontSize] = useState(currentFontSize);
    const[inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);
        if(!isNaN(size) && size > 0){
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputBlur = () =>{
        updateFontSize(inputValue);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    }

    const increment = () =>{
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString());
    }

    const decrement = () =>{
        const newSize = parseInt(fontSize) - 1;
        if(newSize > 0){
            updateFontSize(newSize.toString());
        }
    }

    return(
        <div className="flex items-center gap-x-0.5">
            <button className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80" onClick={decrement}>
                <MinusIcon className="size-4"/>
            </button>
            {isEditing ? (
                <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="h-7 w-10 text-center text-sm border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
                />
            ):(
                <button onClick={() => {
                    setIsEditing(true);
                    setFontSize(currentFontSize);
                }} 
                className="h-7 w-10 text-center text-sm border border-neutral-400 rounded-sm bg-transparent cursor-text" >
                    {currentFontSize}
                </button>
            )}

            <button className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80" onClick={increment}>
                <PlusIcon className="size-4"/>
            </button>
        </div>
    )
}
