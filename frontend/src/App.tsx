import React from "react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Nav} from "@/components/ui/nav.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Data, DataProps} from "@/components/ui/data.tsx";
import {Button} from "@/components/ui/button.tsx";
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

import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {format} from "date-fns";

function App() {

    const [date, setDate] = React.useState<Date>()

    const data : DataProps[] = [
        {
            title : "jusin",
            description : "justin is good bye",
            date : new Date(),
        },
        {
            title : "jusin",
            description : "justin is good bye",
            date : new Date(),
        },
        {
            title : "jusin",
            description : "justin is good bye",
            date : new Date(),
        },
        {
            title : "jusin",
            description : "justin is good bye",
            date : new Date(),
        },

    ]

    const [selectedDates, setSelectedDates] = React.useState<Date[]>([
        new Date(),
        new Date(2024, 11, 25),
    ]);

    const toggleDateSelection = (date : Date[] | undefined) => {


        console.log(date)
        if(date != null){
            setSelectedDates([...date ]);
        }
    };


    return (
        <>
            <Nav />
            <Separator className={"mt-[30px]"}/>
            <div className={"flex flex-row"}>
                <div className={"flex flex-col mx-5 my-5 items-center"}>
                    <Calendar
                        className={"w-[300px] h-[350px] rounded-md border"}
                        style={{
                            width: "300px",
                            height: "350px",
                        }}
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={toggleDateSelection}
                    />

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={"mt-10 w-[70%]"}>Add Event</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add an Event</DialogTitle>
                                <DialogDescription>
                                    Add Event here. Click save when you're done.
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
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Input type={"mul"}
                                        id="description"
                                        placeholder={"Enter Your Description...."}
                                        className="col-span-3"
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
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <Separator className={"h-[100vh]"} orientation={"vertical"}/>

                <div className="my-5 mx-5">
                    <h1 className="text-2xl font-semibold mb-4">Events</h1>
                    <div className="grid grid-cols-4 gap-6">
                        {data.map((d: DataProps) => (
                            <Data key={Math.random()} data={d}/>
                        ))}
                    </div>
                </div>
            </div>


        </>
    );
}

export default App
