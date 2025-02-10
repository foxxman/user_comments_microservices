export interface DecoratorListSettings {
  decorator: (MethodDecorator & ClassDecorator) | MethodDecorator;
  include: boolean;
}
