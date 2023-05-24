export interface Observer {
    subject?: Subject;
    onnotify(message: string): void;
}

export interface Subject {
    observers: Observer[];
    register(observer: Observer): Subject;
    unregister(observer: Observer): void;
    notify(message: string): void;
}


export class Observer1 implements Observer {
    subject?: Subject;
    onnotify(message: string): void {
        console.log(`${message} - Observer1`)
    }

}

export class Observer2 implements Observer {
    subject?: Subject;
    onnotify(message: string): void {
        console.log(`${message} - Observer2`)
    }
}

export class ConcreteSubject implements Subject {
    observers: Observer[] = [];
    register(observer: Observer): Subject {
        this.observers.push(observer);
        return this;
    }
    unregister(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        this.observers.splice(index, 1)
    }
    notify(message: string) {
        this.observers.forEach(observer => {
            observer.onnotify(message);
        })
    }
}

// const subject = new ConcreteSubject();
// const observer1 = new Observer1();
// subject.register(observer1);
// const observer2 = new Observer2();
// subject.register(observer2);
// subject.notify('Notifica');

