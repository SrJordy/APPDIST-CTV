package services

import (
	"context"
	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
)

func SendNotification(app *firebase.App, title, body string) error {
	ctx := context.Background()
	client, err := app.Messaging(ctx)
	if err != nil {
		return err
	}

	tokens := []string{"your_device_token_here"}

	message := &messaging.MulticastMessage{
		Tokens: tokens,
		Notification: &messaging.Notification{
			Title: title,
			Body:  body,
		},
	}

	response, err := client.SendMulticast(ctx, message)
	if err != nil {
		return err
	}

	_ = response

	return nil
}
