"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/use-editor-store";

import { ImageIcon, SearchIcon, UploadCloud } from "lucide-react";
import { useState } from "react";


export default function ImageButton(){
    const {editor} = useEditorStore();
    const [diaglogOpen,setDialogOpen] = useState(false);

    const[imageUrl,setImageUrl] = useState("");

    const onChange = (src : string) => { 
        editor?.chain().focus().setImage({src}).run();
    };

    const onUpload = () =>{
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if(file){
                const imgUrl = URL.createObjectURL(file);
                onChange(imgUrl);
            }
        }

        input.click();
    } 

    const handleImageUrlSubmit = () =>{
        if(imageUrl){
            onChange(imageUrl);
            setImageUrl("");
            setDialogOpen(false);
        }
    }

    return(
        <>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    >
                        <ImageIcon className="size-4"/>
                    </button>
                    
                        

                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadCloud className="mr-2 size-4"/>
                        Upload
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                        <SearchIcon className="mr-2 size-4"/>
                        Paste Image URL
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={diaglogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Image URL</DialogTitle>
                    </DialogHeader>
                    <Input 
                        placeholder="Insert Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleImageUrlSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>

                
            </Dialog>
        </>
    )
};