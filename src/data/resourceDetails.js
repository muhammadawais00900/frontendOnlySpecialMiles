export const getResourceDetailContent = (resource) => {
  const slug = resource?.slug;

  const details = {
    "understanding-sensory-overload": {
      intro:
        "This learning piece explains how sensory overload can build gradually, why a child or learner may suddenly shut down or react strongly, and how calm responses can reduce escalation.",
      sections: [
        {
          title: "What sensory overload can look like",
          body: "Sensory overload may appear as irritability, covering ears, avoidance, tears, sudden fatigue, or difficulty processing instructions. The goal is not to force more input, but to reduce pressure and restore regulation.",
        },
        {
          title: "A simple calm-response sequence",
          body: "Lower the volume of your voice, reduce competing demands, offer short choices, and create a quieter environment. Predictable language and fewer words usually help more than lengthy explanations during the moment.",
        },
        {
          title: "What to do afterwards",
          body: "Once the person is calm, reflect gently on triggers, note helpful supports, and keep a short plan for next time. Over time, these patterns help families and educators respond with more confidence and less guesswork.",
        },
      ],
      highlights: [
        "Recognise early sensory stress signals",
        "Use low-demand calming responses",
        "Build a repeatable support plan",
      ],
    },

    "inclusive-classroom-adjustments-toolkit": {
      intro:
        "This toolkit focuses on practical classroom adjustments that are easy to implement and reduce unnecessary friction for learners who need more structure, clarity, or flexibility.",
      sections: [
        {
          title: "What is inside the toolkit",
          body: "It includes adjustment ideas for instructions, transitions, seating, task breakdown, visual supports, regulation breaks, and participation options so teachers can choose what fits their class context.",
        },
        {
          title: "Low-friction changes that work",
          body: "Examples include chunking instructions, previewing transitions, giving visual checklists, reducing copy-heavy tasks, offering quiet work zones, and allowing more than one way to show understanding.",
        },
        {
          title: "How to use it well",
          body: "Start with one or two adjustments that solve the biggest barrier. Review whether student engagement improves, then keep what works. Consistency matters more than adding too many strategies at once.",
        },
      ],
      highlights: [
        "Classroom-ready practical strategies",
        "Less friction, more participation",
        "Easy to trial and review",
      ],
    },

    "focus-builder-study-worksheet": {
      intro:
        "This worksheet helps students turn vague study intentions into a clear, manageable session with a starting point, a realistic goal, and fewer overwhelm triggers.",
      sections: [
        {
          title: "When to use the worksheet",
          body: "It is useful before homework, revision blocks, assignment catch-up sessions, or exam preparation. It works especially well for students who struggle to begin, prioritise, or estimate how long tasks will take.",
        },
        {
          title: "What the worksheet covers",
          body: "The page guides the learner to define one target task, break it into smaller steps, estimate time, remove distractions, and set a simple completion check before moving on.",
        },
        {
          title: "A helpful routine",
          body: "Encourage students to use the sheet at the same time each day, keep sessions short at first, and celebrate completion rather than perfection. Repetition builds confidence and executive-function habits.",
        },
      ],
      highlights: [
        "Reduces overwhelm before study",
        "Supports planning and focus",
        "Builds steady work habits",
      ],
    },

    "neurodiversity-in-the-workplace-guide": {
      intro:
        "This guide explores how inclusive workplaces improve clarity, trust, performance, and retention by designing systems that work well for a wider range of thinking and communication styles.",
      sections: [
        {
          title: "Why this matters at work",
          body: "Many challenges labelled as performance problems are actually environment or process problems. When expectations, communication, and sensory demands are clearer, employees can contribute with more consistency and less stress.",
        },
        {
          title: "Practical adjustments",
          body: "Useful examples include clearer agendas, written follow-up after meetings, quieter focus time, flexible ways to contribute, transparent task priorities, and manager check-ins that reduce ambiguity.",
        },
        {
          title: "What strong managers do",
          body: "Inclusive managers replace assumptions with clarity. They normalise different working styles, make instructions explicit, and build team habits that improve psychological safety for everyone, not only one employee.",
        },
      ],
      highlights: [
        "Improves clarity and psychological safety",
        "Supports sustainable team performance",
        "Turns inclusion into everyday practice",
      ],
    },

    "home-school-communication-prompts": {
      intro:
        "This article provides short communication prompts that help caregivers and educators exchange useful information without creating long, difficult-to-maintain update cycles.",
      sections: [
        {
          title: "Why simple communication works better",
          body: "Families and educators are more likely to stay consistent when updates are brief, specific, and solution-focused. Overly long messages often become harder to maintain and less useful over time.",
        },
        {
          title: "Examples of strong prompts",
          body: "Helpful prompts include: “What helped most today?”, “Was there a moment of overload or shutdown?”, “What should we repeat tomorrow?”, and “Is there one small support we can keep consistent across home and school?”",
        },
        {
          title: "How to keep it sustainable",
          body: "Choose one format, one frequency, and one shared purpose. The aim is not constant reporting, but enough communication to notice patterns and support the learner with better continuity.",
        },
      ],
      highlights: [
        "Improves consistency between home and school",
        "Keeps updates short and useful",
        "Supports shared problem-solving",
      ],
    },
  };

  return (
    details[slug] || {
      intro:
        "This resource supports practical learning, reflection, and inclusive action through clear ideas and accessible next steps.",
      sections: [
        {
          title: "Overview",
          body: "Use this resource as a starting point for learning, discussion, or implementation in your own context.",
        },
        {
          title: "Practical use",
          body: "Focus on one small change first, reflect on what improves, and then build from there.",
        },
      ],
      highlights: ["Practical", "Clear", "Action-oriented"],
    }
  );
};
