
'use client'
import { useState } from 'react';

export default function Component() {
  const [inputCommand, setInputCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([
    {text: 'Welcome to the Portfolio Terminal', color: 'text-green-500'},
    {text: "Type '/help' to navigate through my professional journey and accomplishments", color: 'text-yellow-500'},
    {text: 'Enjoy your time here!', color: 'text-blue-500'},
  ]);

  // List of commands and their descriptions
  const commands = {
    'about': 'about me',
    'portfolio': 'List of past and present projects',
    'github': 'Link to github',
    // Add more commands and descriptions here 
  };

  // Command responses
  const commandResponses = {
    'about': 'This is a brief paragraph about me. [Insert your bio here].',
    'portfolio': [
      { name: 'Project 1', url: 'https://link-to-project-1.com' },
      { name: 'Project 2', url: 'https://link-to-project-2.com' },
      // Add more projects as needed
    ],
    'github': 'https://github.com/example',
  };

  // Handle command input
  const handleCommandInput = (command:string) => {
    setInputCommand('');

    // Update command history with the entered command
    setCommandHistory(prevHistory => [...prevHistory, {text: ` ${command}`, color: 'text-green-300'}]);

    if (command.trim() === '/help') {
      const helpMessage = Object.entries(commands).map(
        ([cmd, description]) => ({text: `${cmd} - ${description}`, color: 'text-blue-300'})
      );
      setCommandHistory(prevHistory => [...prevHistory, ...helpMessage]);
    } else if (command.trim() === 'about') {
      setCommandHistory(prevHistory => [...prevHistory, {text: commandResponses.about, color: 'text-orange-300'}]);
    } else if (command.trim() === 'portfolio') {
      commandResponses.portfolio.forEach(project => {
        setCommandHistory(prevHistory => [...prevHistory, {text: `${project.name} - ${project.url}`, color: 'text-blue-300'}]);
      });
    } else if (command.trim() === 'github') {
      setCommandHistory(prevHistory => [...prevHistory, {text: commandResponses.github, color: 'text-purple-300'}]);
    } else {
      setCommandHistory(prevHistory => [...prevHistory, {text: 'Unknown command. Enter /help for a list of commands.', color: 'text-red-500'}]);
    }
  };

  // Handle command submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleCommandInput(inputCommand);
  };

  return (
    <section className="w-full h-screen text-white p-8" style={{ backgroundColor: '#000B27' }}>
      {commandHistory.map((line, index) => (
        <pre key={index} className={`font-mono ${line.color} mt-2`} style={{ overflowX: 'auto' }}>
          <code>{`$ ${line.text}`}</code>
        </pre>
      ))}
      <div className="h-0.5 bg-gray-800 my-4" />
      <form onSubmit={handleSubmit} className="font-mono text-white flex items-center">
        <code>{`>_`}</code>
        <input
          aria-label="Terminal Input"
          className="text-white ml-2 outline-none focus:outline-none w-full"
          style={{ backgroundColor: '#000B27' }}
          type="text"
          value={inputCommand}
          onChange={(e) => setInputCommand(e.target.value)}
        />
      </form>
    </section>
  );
}

