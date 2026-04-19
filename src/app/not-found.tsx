import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/ui/page-hero";

export default function NotFound() {
  return (
    <PageHero
      actions={
        <>
          <ButtonLink href="/">Back Home</ButtonLink>
          <ButtonLink href="/members" variant="secondary">
            Members
          </ButtonLink>
        </>
      }
      description="The route you asked for does not exist in this first version of the site."
      eyebrow="404"
      title="Nothing to find here."
    />
  );
}
