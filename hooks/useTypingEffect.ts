import { useEffect, useState } from 'react';
import type { FateTypingState } from '../types';

type TimeoutId = ReturnType<typeof setTimeout>;

const typeString = (
  value: string,
  delay: number,
  update: React.Dispatch<React.SetStateAction<string>>,
  timeouts: TimeoutId[],
  done?: () => void,
) => {
  const step = (index: number) => {
    if (index < value.length) {
      update(prev => prev + value[index]);
      timeouts.push(setTimeout(() => step(index + 1), delay));
      return;
    }
    done?.();
  };
  step(0);
};

const deleteString = (
  value: string,
  delay: number,
  update: React.Dispatch<React.SetStateAction<string>>,
  timeouts: TimeoutId[],
  done?: () => void,
) => {
  const step = (remaining: string) => {
    if (remaining.length > 0) {
      update(prev => prev.slice(0, -1));
      timeouts.push(setTimeout(() => step(remaining.slice(0, -1)), delay));
      return;
    }
    done?.();
  };
  step(value);
};

export function useFateTypingEffect(textVisible: boolean): FateTypingState {
  const [displayedFateText, setDisplayedFateText] = useState('');
  const [isFateTypingActive, setIsFateTypingActive] = useState(false);

  useEffect(() => {
    if (!textVisible) return;

    const timeouts: TimeoutId[] = [];
    const englishText = 'Notes on things I learn and make.';
    const chineseText = '记录学习过程，也整理做过的尝试。';

    setIsFateTypingActive(true);

    const sequence = () => {
      typeString(englishText, 80, setDisplayedFateText, timeouts, () => {
        timeouts.push(setTimeout(() => {
          deleteString(englishText, 50, setDisplayedFateText, timeouts, () => {
            timeouts.push(setTimeout(() => {
              typeString(chineseText, 150, setDisplayedFateText, timeouts, () => {
                timeouts.push(setTimeout(() => {
                  deleteString(chineseText, 100, setDisplayedFateText, timeouts, () => {
                    timeouts.push(setTimeout(sequence, 500));
                  });
                }, 1500));
              });
            }, 500));
          });
        }, 1500));
      });
    };

    sequence();

    return () => {
      timeouts.forEach(clearTimeout);
      setDisplayedFateText('');
      setIsFateTypingActive(false);
    };
  }, [textVisible]);

  return { displayedFateText, isFateTypingActive };
}
