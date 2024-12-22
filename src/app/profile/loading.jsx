import { Search } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full bg-card relative py-1">
      <div className="flex mx-3 my-3 bg-background py-2 px-3 rounded-full border">
        <Search size={24} className={`text-gray-400 transition-colors`} />
        <input
          className="w-full bg-transparent px-3 outline-none peer"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
