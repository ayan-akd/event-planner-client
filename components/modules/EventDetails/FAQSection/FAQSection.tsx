import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="q1">
          <AccordionTrigger className="dark:text-white hover:underline">
            How do I create a new event?
          </AccordionTrigger>
          <AccordionContent className="dark:text-white/90">
            To create a new event, go to the &quot;Create Event&quot; page from your
            dashboard, fill in the required information including title, date,
            and description, then submit.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q2">
          <AccordionTrigger className="dark:text-white hover:underline">
            Can I make my event private?
          </AccordionTrigger>
          <AccordionContent className="dark:text-white/90">
            Yes, while creating or editing your event, you can choose the
            visibility settings to make your event public or private.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q3">
          <AccordionTrigger className="dark:text-white hover:underline">
            Is there a fee to join an event?
          </AccordionTrigger>
          <AccordionContent className="dark:text-white/90">
            Some events are free while others may require a fee. You can see
            this clearly mentioned on the event details page.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="q4">
          <AccordionTrigger className="dark:text-white hover:underline">
            How can I contact the event organizer?
          </AccordionTrigger>
          <AccordionContent className="dark:text-white/90">
            You can message the event organizer directly from the event page or
            find their contact information listed in the event details.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQSection;
