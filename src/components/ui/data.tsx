import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

export type DataProps = {
    title : string;
    description : string;
    date : Date;
}

export function Data({data} : {data : DataProps}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>{data.date.toDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <CardDescription>{data.description}</CardDescription>
            </CardContent>
        </Card>
    );
}
