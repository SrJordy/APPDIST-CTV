package models

import "gorm.io/gorm"

type PacienteCuidador struct {
	gorm.Model
	PacienteID uint     `gorm:"not null"`
	CuidadorID uint     `gorm:"not null"`
	Paciente   Paciente `gorm:"foreignKey:PacienteID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Cuidador   Cuidador `gorm:"foreignKey:CuidadorID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
