const { createApp } = Vue;

createApp({
  data() {
    return {
      newColor: '', // Almacena el nuevo color ingresado por el usuario
      colors: JSON.parse(localStorage.getItem('colors')) || [] // Recupera los colores almacenados en localStorage o inicializa un array vacío
    };
  },
  methods: {
    // Método para agregar un nuevo color
    addColor() {
      if (this.newColor.trim() !== '') { // Verifica que el input no esté vacío
        this.colors.push({ value: this.newColor, editing: false }); // Agrega el nuevo color al array de colores
        this.newColor = ''; // Resetea el input
        this.saveColors(); // Guarda los colores en localStorage
        Swal.fire('¡Registrado!', 'El color ha sido registrado.', 'success'); // Muestra una notificación de éxito
      }
    },
    // Método para alternar el estado de edición de un color
    toggleEditColor(index) {
      this.colors[index].editing = !this.colors[index].editing; // Cambia el estado de edición
      if (!this.colors[index].editing) { // Si se desactiva el modo de edición
        this.saveColors(); // Guarda los cambios en localStorage
        Swal.fire('¡Actualizado!', 'El color ha sido actualizado.', 'success'); // Muestra una notificación de éxito
      }
    },
    // Método para actualizar un color
    updateColor(index) {
      this.colors[index].editing = false; // Desactiva el modo de edición
      this.saveColors(); // Guarda los cambios en localStorage
      Swal.fire('¡Actualizado!', 'El color ha sido actualizado.', 'success'); // Muestra una notificación de éxito
    },
    // Método para confirmar y eliminar un color
    confirmDeleteColor(index) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) { // Si el usuario confirma la eliminación
          this.colors.splice(index, 1); // Elimina el color del array
          this.saveColors(); // Guarda los cambios en localStorage
          Swal.fire('¡Eliminado!', 'El color ha sido eliminado.', 'success'); // Muestra una notificación de éxito
        }
      });
    },
    // Método para guardar los colores en localStorage
    saveColors() {
      localStorage.setItem('colors', JSON.stringify(this.colors)); // Convierte el array de colores a JSON y lo guarda en localStorage
    }
  }
}).mount('#app');