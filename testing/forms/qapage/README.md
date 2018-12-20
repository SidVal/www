# QA Page

>A QAPage is a WebPage focussed on a specific Question and its Answer(s), e.g. in a question answering site or documenting Frequently Asked Questions (FAQs).

- [Ver idea](https://github.com/SidVal/SidV/issues/35)
- [Page.html](https://sidval.github.io/www/testing/forms/qapage/page.html)

## Info

- Only use the `QAPage` markup if your page has information in a question and answer format, which is one question followed by zero or more answers.
- Don’t use `QAPage` markup for advertising purposes.
- Make sure each `Question` includes the entire text of the question and make sure each Answer includes the entire text of the answer.
- `Answer` markup is for answers to the question, not for comments on the question or comments on other answers. Do not markup non-answer comments as an Answer.
- Question and answer content may not be displayed as a rich result if it contains any of the following types of content: obscene, profane, sexually explicit, graphically violent, promotion of dangerous or illegal activities, or hateful or harassing language.

## Referencias

- https://developers.google.com/search/docs/data-types/qapage
- https://schema.org/QAPage
