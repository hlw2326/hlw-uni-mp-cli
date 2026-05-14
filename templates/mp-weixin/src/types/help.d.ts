declare namespace IHelp {
    interface Faq {
        question: string;
        answer: string;
    }

    interface ListResult {
        steps: string[];
        faqs: Faq[];
    }
}
