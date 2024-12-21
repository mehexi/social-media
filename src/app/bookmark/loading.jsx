import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col h-screen overflow-x-auto">
      <CardHeader>
        <CardTitle>Bookmarks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-card relative">
          <div className="flex bg-background py-2 px-3 rounded border gap-3">
            <Search />
            <input
              placeholder="Search Your Bookmarks"
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>
      </CardContent>
    </div>
  );
}
