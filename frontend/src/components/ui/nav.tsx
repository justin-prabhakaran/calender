import { Input } from "@/components/ui/input.tsx";
// import { Button } from "@/components/ui/button.tsx";

export function Nav({ onSearch }: { onSearch: (query: string) => void }) {
    const handleSearch = () => {
        const query = document.getElementById("searchInput") as HTMLInputElement;
        onSearch(query.value);
    };

    return (
        <div className={"mx-[10vw] mt-[30px] flex flex-row items-center justify-between"}>
            <h1 className={"text-2xl font-semibold "}>
                Calendar
            </h1>
            <div className={"flex flex-row justify-between"}>
                <Input
                    placeholder={"Search ...."}
                    onChange={()=>{
                        handleSearch();
                    }}
                    id="searchInput"
                    style={{
                        width: "30vw"
                    }}
                />
                {/*<Button onClick={handleSearch}>Search</Button>*/}
            </div>
        </div>
    );
}
