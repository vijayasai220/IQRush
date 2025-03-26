/**
 * Quiz App - Improved Version
 */
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
} from 'react-native';

const quizzes = [
  {
    title: 'General Knowledge Quiz',
    questions: [
      {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
      },
      {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 'Paris',
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correctAnswer: 'Mars',
      },
      {
        question: 'What is the largest mammal?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 'Blue Whale',
      },
      {
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'NaCl'],
        correctAnswer: 'H2O',
      },
    ],
  },
  {
    title: 'Advanced Quiz',
    questions: [
      {
        question: 'What is 10 * 5?',
        options: ['40', '50', '60', '70'],
        correctAnswer: '50',
      },
      {
        question: 'Which country is known as the Land of the Rising Sun?',
        options: ['China', 'Korea', 'Japan', 'Vietnam'],
        correctAnswer: 'Japan',
      },
      {
        question: 'What is the largest ocean?',
        options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
        correctAnswer: 'Pacific',
      },
      {
        question: 'What is the primary gas in Earth\'s atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
        correctAnswer: 'Nitrogen',
      },
      {
        question: 'What is the square root of 144?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
      },
    ],
  },
];

function QuizScreen({ quiz, onQuizComplete }: {
  quiz: { title: string; questions: any[] };
  onQuizComplete: (correct: number, incorrect: number, summary: any[]) => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<'correct' | 'incorrect' | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionSummary, setQuestionSummary] = useState<any[]>([]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Quiz in Progress',
        'You cannot go back while taking the quiz. Do you want to quit?',
        [
          { text: 'Continue Quiz', style: 'cancel' },
          {
            text: 'Quit Quiz',
            onPress: () => onQuizComplete(correctAnswers, quiz.questions.length - correctAnswers, questionSummary)
          }
        ]
      );
      return true;
    });

    return () => backHandler.remove();
  }, [correctAnswers, questionSummary]);

  const handleOptionSelect = (option: string) => {
    if (answerResult !== null) return; // Prevent changing answer after submission
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setAnswerResult(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setQuestionSummary([
      ...questionSummary,
      {
        question: currentQuestion.question,
        userAnswer: selectedOption,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswerResult(null);
    } else {
      onQuizComplete(correctAnswers, quiz.questions.length - correctAnswers, questionSummary);
    }
  };

  return (
    <View style={styles.quizContainer}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.questionNumber}>
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOption,
            answerResult === 'correct' && option === currentQuestion.correctAnswer && styles.correctOption,
            answerResult === 'incorrect' && option === selectedOption && styles.incorrectOption,
            answerResult === 'incorrect' && option === currentQuestion.correctAnswer && styles.correctOption,
          ]}
          onPress={() => handleOptionSelect(option)}
          disabled={answerResult !== null}
        >
          <Text style={[
            styles.optionText,
            (answerResult === 'correct' && option === currentQuestion.correctAnswer) && styles.correctOptionText,
            (answerResult === 'incorrect' && option === selectedOption) && styles.incorrectOptionText,
          ]}>
            {option}
            {answerResult === 'correct' && option === currentQuestion.correctAnswer && ' ✓'}
            {answerResult === 'incorrect' && option === selectedOption && ' ✗'}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.buttonContainer}>
        {answerResult ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
            <Text style={styles.buttonText}>
              {currentQuestionIndex === quiz.questions.length - 1 ? 'See Results' : 'Next Question'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.checkButton, !selectedOption && styles.disabledButton]}
            onPress={handleCheckAnswer}
            disabled={!selectedOption}
          >
            <Text style={styles.buttonText}>Check Answer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function ResultScreen({
  correct,
  incorrect,
  summary,
  onRestart
}: {
  correct: number;
  incorrect: number;
  summary: any[];
  onRestart: () => void;
}) {
  const totalQuestions = correct + incorrect;
  const percentage = Math.round((correct / totalQuestions) * 100);

  return (
    <View style={styles.resultContainer}>
      <ScrollView contentContainerStyle={styles.resultScrollContainer}>
        <Text style={styles.resultTitle}>Quiz Completed!</Text>
        
        <View style={styles.scoreContainer}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreNumber}>{correct}</Text>
            <Text style={styles.scoreLabel}>Correct</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreNumber}>{incorrect}</Text>
            <Text style={styles.scoreLabel}>Incorrect</Text>
          </View>
          <View style={[styles.scoreCard, styles.percentageCard]}>
            <Text style={styles.percentageText}>{percentage}%</Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
        </View>

        <Text style={styles.summaryTitle}>Question Review</Text>
        {summary.map((item, index) => (
          <View key={index} style={[
            styles.summaryItem,
            item.isCorrect ? styles.correctSummaryItem : styles.incorrectSummaryItem
          ]}>
            <Text style={styles.summaryQuestion}>Q{index + 1}: {item.question}</Text>
            <Text style={[
              styles.summaryAnswer,
              item.isCorrect ? styles.correctAnswerText : styles.incorrectAnswerText
            ]}>
              Your answer: {item.userAnswer}
              {item.isCorrect ? ' ✓' : ' ✗'}
            </Text>
            {!item.isCorrect && (
              <Text style={[styles.summaryAnswer, styles.correctAnswerText]}>
                Correct answer: {item.correctAnswer}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
        <Text style={styles.buttonText}>Try Another Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [quizResult, setQuizResult] = useState<{
    correct: number;
    incorrect: number;
    summary: any[];
  } | null>(null);

  const handleQuizSelect = (quiz: any) => {
    setSelectedQuiz(quiz);
    setQuizResult(null);
  };

  const handleQuizComplete = (correct: number, incorrect: number, summary: any[]) => {
    setQuizResult({ correct, incorrect, summary });
    setSelectedQuiz(null);
  };

  const handleRestart = () => {
    setQuizResult(null);
  };

  if (selectedQuiz) {
    return <QuizScreen quiz={selectedQuiz} onQuizComplete={handleQuizComplete} />;
  }

  if (quizResult) {
    return <ResultScreen {...quizResult} onRestart={handleRestart} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.appTitle}>Quiz App</Text>
      <ScrollView contentContainerStyle={styles.quizListContainer}>
        {quizzes.map((quiz) => (
          <TouchableOpacity
            key={quiz.title}
            style={styles.quizListItem}
            onPress={() => handleQuizSelect(quiz)}
          >
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizSubtitle}>{quiz.questions.length} questions</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  quizListContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  quizListItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  quizSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  quizContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498db',
  },
  questionNumber: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 25,
  },
  optionButton: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  selectedOption: {
    borderColor: '#3498db',
    backgroundColor: '#ebf5fb',
  },
  correctOption: {
    borderColor: '#2ecc71',
    backgroundColor: '#e8f8f1',
  },
  incorrectOption: {
    borderColor: '#e74c3c',
    backgroundColor: '#fdedec',
  },
  correctOptionText: {
    color: '#2ecc71',
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 20,
  },
  checkButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  resultScrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  resultTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  scoreCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  percentageCard: {
    backgroundColor: '#2ecc71',
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  percentageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  summaryItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
  },
  correctSummaryItem: {
    borderLeftColor: '#2ecc71',
  },
  incorrectSummaryItem: {
    borderLeftColor: '#e74c3c',
  },
  summaryQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 8,
  },
  summaryAnswer: {
    fontSize: 14,
    marginBottom: 4,
  },
  correctAnswerText: {
    color: '#2ecc71',
  },
  incorrectAnswerText: {
    color: '#e74c3c',
  },
  restartButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  },
});

export default App;