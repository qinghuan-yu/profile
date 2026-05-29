import { useEffect, useRef, useState } from 'react';
import type { EnvData, EnvParamsTypingState, FateTypingState } from '../types';

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
    const englishText = 'Stuffing data science, musical expression, and hardware experiments into the archive';
    const chineseText = '正在把数据科学、音乐表达和硬件实验塞进同一个档案库';

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

export function useEnvParamsTypingEffect(textVisible: boolean): EnvParamsTypingState {
  const [displayedEnvParams, setDisplayedEnvParams] = useState('');
  const [isEnvParamsTyping, setIsEnvParamsTyping] = useState(false);
  const [envData, setEnvData] = useState<EnvData | null>(null);
  const [envDataVersion, setEnvDataVersion] = useState(0);
  const currentTempRef = useRef(55.0);
  const lastGeneratedParamsRef = useRef('');

  useEffect(() => {
    if (!textVisible) return;

    const timeouts: TimeoutId[] = [];
    setIsEnvParamsTyping(true);

    const generateNewParams = () => {
      const tempChange = (Math.random() * 3) - 1.5;
      const newTemp = Math.max(44, Math.min(66, currentTempRef.current + tempChange));
      currentTempRef.current = newTemp;

      const rad = Math.floor(200 + Math.random() * 300);
      const o2 = (8 + Math.random() * 2).toFixed(1);
      const pollutionLevels = ['SEVERE', 'CRITICAL', 'UNSTABLE', 'HAZARDOUS'];
      const rainStatus = ['IMMINENT', 'LIKELY', 'UNLIKELY', 'CERTAIN'];
      const warnings = [
        'ALERT: TOXIC EXPOSURE RISK',
        'CAUTION: RADIATION STORM',
        'DANGER: ACID ZONES EXPANDING',
        'URGENT: OXYGEN DEPLETION',
      ];

      const pollution = pollutionLevels[Math.floor(Math.random() * pollutionLevels.length)];
      const acidRain = rainStatus[Math.floor(Math.random() * rainStatus.length)];
      const warningLine = Math.random() > 0.5
        ? `\n${warnings[Math.floor(Math.random() * warnings.length)]}`
        : '';

      setEnvData({ temp: newTemp, rad, o2: parseFloat(o2), pollution, acidRain });
      setEnvDataVersion(prev => prev + 1);

      return `TEMP: ${newTemp.toFixed(1)}°C\nRAD: ${rad}mSv/h\nO2: ${o2}%\nPOLLUTION: ${pollution}\nACID RAIN: ${acidRain}${warningLine}`;
    };

    const generateAndType = () => {
      const newParams = generateNewParams();
      lastGeneratedParamsRef.current = newParams;
      typeString(newParams, 35, setDisplayedEnvParams, timeouts, () => {
        timeouts.push(setTimeout(startTyping, 8000 + Math.floor(Math.random() * 7000)));
      });
    };

    const startTyping = () => {
      const textToDelete = lastGeneratedParamsRef.current;
      if (textToDelete.length > 0) {
        deleteString(textToDelete, 20, setDisplayedEnvParams, timeouts, generateAndType);
      } else {
        generateAndType();
      }
    };

    timeouts.push(setTimeout(startTyping, 1000));

    return () => {
      timeouts.forEach(clearTimeout);
      setDisplayedEnvParams('');
      setIsEnvParamsTyping(false);
      setEnvData(null);
      setEnvDataVersion(0);
      lastGeneratedParamsRef.current = '';
    };
  }, [textVisible]);

  return { displayedEnvParams, isEnvParamsTyping, envData, envDataVersion };
}
