export const getChatResponse = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    // Mock chatbot responses
    const responses = [
      "I'm here to help! What would you like to know about your boards?",
      "You can drag and drop cards to move them between lists.",
      "Use labels to organize your cards by category or priority.",
      "Add members to cards to assign tasks to your team.",
      "You can search for cards using keywords in their title or description.",
      "Create checklists to break down tasks into smaller items.",
      "Use due dates to keep track of deadlines.",
      "You can color-code your boards for better organization."
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    res.json({
      message: randomResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
