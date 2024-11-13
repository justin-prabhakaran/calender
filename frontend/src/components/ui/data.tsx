import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { EllipsisVertical } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import {Events} from "@/controller/controller.ts";

export function Data({ event, editButton, onDelete }: { event: Events, editButton : React.ReactNode, onDelete : (event : Events)=>void }) {


    const dateObj = new Date(event.date);

    const formattedDate = !isNaN(dateObj.getTime()) ? dateObj.toDateString() : "Invalid Date";

    return (
        <Card>
            <CardHeader>
                <div className={"flex flex-row justify-between"}>
                    <CardTitle className={"overflow-hidden"}>{event.title}</CardTitle>

                    <Popover>
                        <PopoverTrigger asChild>
                            <button>
                                <EllipsisVertical />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3 flex flex-col justify-evenly items-start">
                            {editButton}
                            <button onClick={()=>{
                                onDelete(event)
                            }}>delete</button>
                        </PopoverContent>
                    </Popover>
                </div>
                <CardDescription>{formattedDate}</CardDescription> {/* Display formatted date */}
            </CardHeader>
            <CardContent>
                <CardDescription className={"overflow-hidden"}>{event.description}</CardDescription>
            </CardContent>
        </Card>
    );
}
