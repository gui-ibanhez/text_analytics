module WelcomeHelper
    def available_months
        Freq.select('anomes').distinct.map { |e| e.anomes }
    end
end
