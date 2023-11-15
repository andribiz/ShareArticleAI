import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <Card className="m-3">
      <CardContent className="pt-4">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[500px]" />
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  );
}
