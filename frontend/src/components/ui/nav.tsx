import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";


export function Nav() {
    return (
        <div className={"mx-[10vw] mt-[30px] flex flex-row items-center justify-between"}>
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
