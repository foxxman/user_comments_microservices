import { DecoratorListSettings } from '@custom-types/decorators';

export const mapDecoratorsList = ({
  decoratorListSettings,
}: {
  decoratorListSettings: DecoratorListSettings[];
}): ((MethodDecorator & ClassDecorator) | MethodDecorator)[] =>
  decoratorListSettings
    .map(({ include, decorator }) => (include ? decorator : null))
    .filter(Boolean);
