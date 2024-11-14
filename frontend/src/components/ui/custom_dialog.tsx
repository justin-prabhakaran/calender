import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils.ts";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Events } from "@/controller/controller.ts";
import {DateTimePicker} from "@/components/ui/date_time_picker.tsx";

export type CustomDialogProps = {
    button: React.ReactNode;
    title: string;
    description: string;
    onSave: (id : string, title: string, description: string, date: Date) => Promise<void>;
};

export type CustomData = {
    isEdit: boolean;
    event: Events;
};

export function CustomDialog({ props, data }: { props: CustomDialogProps; data: CustomData }) {
    const [date, setDate] = React.useState<Date | undefined>(data.isEdit ? data.event.date : new Date());
    const [title, setTitle] = React.useState<string>(data.isEdit ? data.event.title : "");
    const [description, setDesc] = React.useState<string>(data.isEdit ? data.event.description : "");

    useEffect(() => {
        if (data.isEdit) {
            setDate(data.event.date);
            setTitle(data.event.title);
            setDesc(data.event.description);
        }
    }, [data.isEdit, data.event]);

    function handleSubmit() {
        if (date && title && description) {
            props.onSave(data.event.id,title, description, date);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{props.button}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>{props.description}</DialogDescription>
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
                        {/*<Popover>*/}
                        {/*    <PopoverTrigger asChild>*/}
                        {/*        <Button*/}
                        {/*            variant={"outline"}*/}
                        {/*            className={cn("mt-4 w-[280px] justify-self-center text-left font-normal", !date && "text-muted-foreground")}*/}
                        {/*        >*/}
                        {/*            <CalendarIcon />*/}
                        {/*            {date ? format(date, "PPP") : <span>Pick a date</span>}*/}
                        {/*        </Button>*/}
                        {/*    </PopoverTrigger>*/}
                        {/*    <PopoverContent className="w-auto p-0">*/}
                        {/*        /!*<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />*!/*/}
                        {/*        */}
                        {/*    </PopoverContent>*/}
                        {/*</Popover>*/}

                        <DateTimePicker value={date} onChange={setDate}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type={"button"} onClick={handleSubmit}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
