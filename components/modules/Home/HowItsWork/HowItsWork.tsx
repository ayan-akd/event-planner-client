import { CalendarCheck, CheckCircle, CreditCard, Search } from "lucide-react";
import MyContainer from "../../shared/MyContainer/MyContainer";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";

const HowItsWork = () => {
  return (
    <MyContainer>
      <div>
        <SectionTitle
          sectionTitle="How Its Work"
          sectionSubTitle="Explore events, complete your registration, and get approved to join — all in one place"
        />
      </div>
      <ol className="relative space-y-8 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-gray-200">
        <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
          <div className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
            <span className="size-3 shrink-0 rounded-full bg-primary"></span>

            <div className="-mt-2">
              <div className="flex justify-end ">
                <Search className="md:size-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Browse Events</h3>

              <p className="mt-0.5 text-sm text-gray-700">
                Explore a wide range of public and private events. Use filters
                and search to find events that match your interests.
              </p>
            </div>
          </div>

          <div aria-hidden="true"></div>
        </li>

        <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
          <div className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
            <span className="size-3 shrink-0 rounded-full bg-primary"></span>

            <div className="-mt-2">
              <div className="flex justify-start ">
                <CreditCard className="md:size-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Join or Pay to Register
              </h3>

              <p className="mt-0.5 text-sm text-gray-700">
                Click
                <span className="bg-primary text-white text-xs py-[1px] px-1 rounded">
                  Join
                </span>
                for free events or make a secure payment for paid ones. For
                private events, request access and complete the payment if
                required.
              </p>
            </div>
          </div>

          <div aria-hidden="true"></div>
        </li>

        <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
          <div className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
            <span className="size-3 shrink-0 rounded-full bg-primary"></span>

            <div className="-mt-2">
              <div className="flex justify-end ">
                <CheckCircle className="md:size-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Get Approved</h3>

              <p className="mt-0.5 text-sm text-gray-700">
                Once your request is submitted, event organizers will review and
                approve your participation. You’ll get notified instantly after
                approval.
              </p>
            </div>
          </div>

          <div aria-hidden="true"></div>
        </li>
        <li className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3">
          <div className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
            <span className="size-3 shrink-0 rounded-full bg-primary"></span>

            <div className="-mt-2">
              <div className="flex justify-start ">
                <CalendarCheck className="md:size-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Attend & Enjoy
              </h3>

              <p className="mt-0.5 text-sm text-gray-700">
                Join the event at the scheduled time—online or in person. Don’t
                forget to leave a review afterward!
              </p>
            </div>
          </div>

          <div aria-hidden="true"></div>
        </li>
      </ol>
    </MyContainer>
  );
};

export default HowItsWork;
