import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";


export function Nav() {
    return (
        <div className={"mt-[30px] flex flex-row items-center justify-around"}>
            <h1 className={"text-2xl font-semibold "}>
                Calender
            </h1>
            <div className={"flex flex-row justify-between"}>
                <Input style={{
                    width : "30vw"
                }}/>
                <Button>Search</Button>
            </div>
        </div>
    );
}
