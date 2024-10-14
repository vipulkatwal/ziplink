import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="my-8 sm:my-12 lg:my-16 text-2xl sm:text-4xl lg:text-5xl text-gray-900 text-center font-extrabold">
        Squeezing your URLs like the <span className="text-red-700">last bit of toothpaste</span>
      </h2>
      <form
        onSubmit={handleShorten}
        className="w-full max-w-2xl mx-auto mb-8 sm:mb-12"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-grow w-full sm:w-auto">
            <Input
              type="url"
              placeholder="Feed me your lengthy link here..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="h-12 pl-4 pr-4 rounded-xl text-base bg-gray-800 border-gray-600 text-white placeholder-gray-400 w-full"
            />
          </div>
          <Button
            type="submit"
            className="h-12 px-5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors w-full sm:w-auto mt-2 sm:mt-0"
          >
            <Link className="h-5 w-5 mr-2" />
            Shrink!
          </Button>
        </div>
      </form>

      <div className="w-full mt-12 sm:mt-16 lg:mt-20 rounded-lg overflow-hidden shadow-sm">
        <Accordion type="single" collapsible className="w-full divide-y divide-gray-200">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="px-4 sm:px-6 py-4 text-base sm:text-lg font-semibold text-gray-800 transition-colors">
              How does the Ziplink URL shortener work?
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-700">
              When you enter a long URL, our system generates a shorter version of
              that URL. This shortened URL redirects to the original long URL when
              accessed. It&rsquo;s a simple yet powerful way to make your links more manageable and shareable.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger className="px-4 sm:px-6 py-4 text-base sm:text-lg font-semibold text-gray-800">
              Do I need an account to use the app?
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-700">
              Yes, creating an account allows you to manage your URLs, view
              analytics, and customize your short URLs. With an account, you&rsquo;ll have access to additional features and be able to track the performance of your shortened links over time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-none">
            <AccordionTrigger className="px-4 sm:px-6 py-4 text-base sm:text-lg font-semibold text-gray-800">
              What analytics are available for my shortened URLs?
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-700">
              <p>You can view comprehensive analytics for each of your shortened URLs, including:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Number of clicks</li>
                <li>Geolocation data of the clicks</li>
                <li>Device types (mobile/desktop)</li>
                <li>Referral sources</li>
                <li>Time-based click patterns</li>
              </ul>
              <p className="mt-2">These insights help you understand your audience and optimize your link sharing strategy.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;