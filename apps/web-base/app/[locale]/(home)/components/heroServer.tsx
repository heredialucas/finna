import { getDolarRates } from "@repo/data-services";
import { Hero } from "./hero";

export async function HeroServer({ dictionary }: { dictionary: any }) {
    const { oficial, blue, error } = await getDolarRates();
    return <Hero dictionary={dictionary} oficial={oficial} blue={blue} error={error} />;
}