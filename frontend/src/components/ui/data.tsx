import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { EllipsisVertical } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import {CustomDialog} from "@/components/ui/custom_dialog.tsx";
// import { CustomDialog } from "@/components/ui/custom_dialog.tsx";

export type DataProps = {
    title: string;
    description: string;
    date: string | Date;
}

export function Data({ data, editButton }: { data: DataProps, editButton : React.ReactNode }) {


    // Convert data.date to a Date object if it's a string
    const dateObj = new Date(data.date);

    // Check if the date is valid
    const formattedDate = !isNaN(dateObj.getTime()) ? dateObj.toDateString() : "Invalid Date";

    return (
        <Card>
            <CardHeader>
                <div className={"flex flex-row justify-between"}>
                    <CardTitle>{data.title}</CardTitle>

                    <Popover>
                        <PopoverTrigger asChild>
                            <button>
                                <EllipsisVertical />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3 flex flex-col justify-evenly items-start">
                            {editButton}
                            <button>delete</button>
                        </PopoverContent>
                    </Popover>
                </div>
                <CardDescription>{formattedDate}</CardDescription> {/* Display formatted date */}
            </CardHeader>
            <CardContent>
                <CardDescription>{data.description}</CardDescription>
            </CardContent>
        </Card>
    );
}
