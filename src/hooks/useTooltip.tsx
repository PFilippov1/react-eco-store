import * as Tooltip from '@radix-ui/react-tooltip';

interface UseTooltipOptions {
  content: string;
  delayDuration?: number;
}

export const useTooltip = ({ content, delayDuration }: UseTooltipOptions) => {
  const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Tooltip.Provider delayDuration={delayDuration}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={5}
            className="px-2 py-1 rounded text-xs shadow-md animate-in z-50"
          >
            {content}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );

  return TooltipProvider;
};
