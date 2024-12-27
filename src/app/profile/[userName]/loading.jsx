import { Card, CardContent } from "@/components/ui/card";
import { Loader2Icon, Search } from "lucide-react";

export default function Loading() {
  return (
    <Card className='w-full h-screen flex items-center justify-center bg-transparent'>
      <CardContent>
        <Loader2Icon size={34} className="animate-spin"/>
      </CardContent>
    </Card>
  );
}
