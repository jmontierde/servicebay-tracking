import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/app/tracker/[id]/constants/testimonials";

const TestimonialSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">
            Real Shop Owners, Real Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            See how ServiceBay is making shop owners more profitable every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative hover:shadow-card transition-all duration-300 bg-card border-border"
            >
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-primary mb-6" />
                <blockquote className="text-lg text-card-foreground font-body mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Results */}
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 gap-2 text-center">
                    <div>
                      <div className="text-2xl font-bold text-accent">
                        {testimonial.savings}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Monthly Savings
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {testimonial.metric}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="font-semibold font-heading text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-muted-foreground font-body">
                    {testimonial.role}
                  </div>
                  <div className="text-primary font-body font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Trust Element */}
        <div className="mt-16 text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Simple Over Sophisticated
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Shop owners don&rsquo;t want AI. They want to go home at 5 PM with
              more money in their pocket. We show them that transformation, not
              the technology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">2 minutes</div>
                <div className="text-muted-foreground">Average setup time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">Day 1</div>
                <div className="text-muted-foreground">Techs productive</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">$10K+</div>
                <div className="text-muted-foreground">
                  Monthly profit increase
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
