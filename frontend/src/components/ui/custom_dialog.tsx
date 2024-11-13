 import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import React from "react";
import {Calendar} from "@/components/ui/calendar.tsx";


export type CustomDialogProps = {
    button : React.ReactNode;
    title : string;
    description : string;
    onSave : (title: string , description: string, date: Date) => void;
}

export function CustomDialog({data}: {data : CustomDialogProps}) {

    const [date, setDate] = React.useState<Date | undefined>()
    const [title, setTitle] = React.useState<string>('')
    const [description, setDesc] = React.useState<string>('')

    function handleSubmit(){
        console.log(title + description + date!.toDateString());
        if(date && title && description){
            data.onSave(title,description,date);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {data.button}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{data.title}</DialogTitle>
                    <DialogDescription>
                        {data.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            placeholder={"Enter Your Title"}
                            className="col-span-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                               id="description"
                               placeholder={"Enter Your Description...."}
                               className="col-span-3"
                               value={description}
                               onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 items-center">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "mt-4 w-[280px] justify-self-center text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button type={"button"} onClick={() => {
                        handleSubmit()
                    }}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
